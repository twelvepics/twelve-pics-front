<template>
    <!-- START MAIN CONTENT -->
    <main>
        <div class="container is-fluid" ref="stories-container">
            <div class="columns">
                <div class="column auto">
                    <page-loader v-if="this.isAuthenticated && !this.isUserInited"></page-loader>
                    <!-- STORIES -->
                    <div>
                        <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief>
                        <infinite-loading
                            v-if="!this.isAuthenticated || this.isUserInited"
                            @infinite="infiniteHandler"
                            :identifier="infiniteId"
                        >
                            <div slot="spinner">
                                <page-loader></page-loader>
                            </div>
                            <div slot="no-more">
                                <page-error errorMessage="No more stories :("></page-error>
                            </div>
                            <div slot="no-results">
                                <page-error errorMessage="No result :("></page-error>
                            </div>
                            <div slot="error">
                                <page-error errorMessage="Ooops, something went wrong :("></page-error>
                            </div>
                        </infinite-loading>
                    </div>

                    <!-- END STORIES -->
                </div>
                <div class="is-divider-vertical"></div>
                <div class="column is-narrow is-hidden-touch" style="max-width:300px;">
                    <div class="notification is-danger" style="padding:1em;">
                        <p class="title is-6" style="padding:0;margin:0;">Welcome on twelvepics.com</p>
                        <p class="content" style="padding:0;margin:.5rem 0 0 0;font-size:95%;">
                            Right now Twelvepics is in beta stage. You can try the site, your feedback and suggestions
                            are welcome.<br />
                        </p>
                    </div>
                    <div class="notification is-warning" style="padding:1em;">
                        <p class="title is-6" style="padding:0;margin:0;">TL;DR</p>
                        <p class="content" style="padding:0;margin:.5rem 0 0 0;font-size:95%;">
                            Photo stories may be powerful, touching, emotional. They can help us understand what’s going
                            on in the world. Tell us your stories...
                        </p>
                    </div>
                    <div class="notification is-primary" style="padding:1em;">
                        <p class="title is-6" style="padding:0;margin:0;">Where we stand</p>
                        <p class="content" style="padding:0;margin:.5rem 0 0 0;font-size:95%;">
                            Twelvepics is free to use and will remain so. We believe that copyright empowers creativity,
                            no further use than what you've decided to publish on the site will ever be made by us.<br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- END MAIN CONTENT -->
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { EventBus } from "../event-bus.js";
import { mapActions, mapGetters } from "vuex";
import store from "@/store/store.js";
import { categoriesToIds } from "@/utils/categories.js";
import axiosBase from "../services/axiosBase";
import StoryBrief from "../components/StoryBrief.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";

import * as Sentry from "@sentry/browser";

///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
    name: "home",
    components: {
        InfiniteLoading,
        StoryBrief,
        PageLoader,
        PageError
    },
    data: function() {
        return {
            page: 1,
            stories: [],
            infiniteId: +new Date(),
            is_error: false,
            errorMessage: "",
            is_debug: true
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser", "isUserInited"])
    },
    methods: {
        ...mapActions(["resetStoryComponentHomeLayout"]),
        async fetchStories($state) {
            try {
                console.log("# --- infiniteHandler called --- #");
                console.log(`# --- Fetching page ${this.page} --- #`);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                let params = {};
                // not authenticated user, need to send categories as a qs
                const categories = store.getters.getCategories;
                const categories_by_ids = categories
                    .map(c => categoriesToIds[c])
                    .sort((a, b) => a - b)
                    .join("-");
                params.categories = categories_by_ids;
                params.page = this.page;
                const response = await axiosBase.get(`/stories`, {
                    params
                });
                const stories = response.data.stories;
                if (stories.length) {
                    this.page += 1;
                    this.stories.push(...stories);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } catch (e) {
                console.log(e);
                Sentry.captureException(e);
                $state.error();
            }
        },
        async onCategoriesChanged() {
            this.changeFilter();
        },
        async onSearchTriggered(searchStr) {
            // go to search page pass searchstr as qs
            // hide cats in header
            this.$router.push({ name: "search", query: { q: searchStr } });
        },
        async infiniteHandler($state) {
            await this.fetchStories($state);
        },
        changeFilter() {
            this.page = 1;
            this.stories = [];
            this.infiniteId += 1;
        },
        updateStory(story) {
            const [story_to_update] = this.stories.filter(s => s._key === story._key);
            story_to_update.comments_count = story.comments_count;
        }
    },
    created() {
        console.log(`User inited -> ${this.isUserInited}`);
        console.log(`Env: ${process.env.NODE_ENV}`);
        console.log(`Env base url: ${process.env.BASE_URL}`);
    },
    mounted() {
        console.log("Home mounted");
        EventBus.$on("categoriesChanged", () => {
            this.onCategoriesChanged();
        });
        EventBus.$on("searchTriggered", searchStr => {
            this.onSearchTriggered(searchStr);
        });
        EventBus.$on("login", () => {
            this.changeFilter();
        });
    },
    beforeDestroy() {
        console.log("Home beforeDestroyed");
        EventBus.$off("categoriesChanged");
        EventBus.$off("searchTriggered");
        EventBus.$off("login");
    },
    destroyed() {
        console.log("Home destroyed");
    },
    watch: {
        // ----------------------------------------------------------------------
        isUserInited(newVal, oldVal) {
            console.log(`User inited watcher: ${oldVal} to ${newVal}`);
        },
        // ----------------------------------------------------------------------
        $route(to, from) {
            // UPDATE NUM COMMENTS IF ROUTE FROM == view-story
            console.log("# --- Watch route --- #");
            // if (from.name === "home") {
            //     try {
            //         this.changeFilter();
            //     } catch (e) {
            //         // do nothing
            //     }
            // }
            if (from.name === "view-story") {
                const from_slug = from.params.slug;
                axiosBase
                    .get(`/stories/${from_slug}`)
                    .then(response => {
                        if (response && response.status === 200) {
                            this.updateStory(response.data.story);
                        }
                    })
                    .catch(e => {
                        // just log me
                        console.error(e);
                        Sentry.captureException(e);
                    });
            }
        }
    }
};
</script>

<style scoped></style>
