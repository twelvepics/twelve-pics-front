<template>
    <!-- START MAIN CONTENT -->
    <main>
        <div class="container is-fluid" ref="stories-container">
            <div class="columns">
                <div class="column auto">
                    <!-- STORIES -->
                    <div>
                        <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief>
                        <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
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
                <div class="column is-narrow is-hidden-touch">
                    <div class="notification is-danger" style="padding:1em;">
                        <p class="title is-5">Fixed column</p>
                        <p class="content">This column is fixed 300px wide.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- END MAIN CONTENT -->
</template>

<script>
// eslint-disable-next-line
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";
import { EventBus } from "../event-bus.js";
import { mapActions, mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
// import StoryModal from "../components/StoryModal.vue";
import StoryBrief from "../components/StoryBrief.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";

///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
    name: "search",
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
        ...mapGetters(["isAuthenticated", "authenticatedUser"]),
        searchStr: function() {
            return this.$route.query.q;
        }
    },
    methods: {
        ...mapActions(["resetStoryComponentHomeLayout"]),
        async fetchStories($state) {
            try {
                console.log("infiniteHandler called");
                console.log(`Fetching page ${this.page}`);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                let params = {};
                if (this.page > 1) {
                    params.page = this.page;
                }
                params.q = this.searchStr;
                const response = await axiosBase.get(`/stories/search`, {
                    params
                });
                console.log(response.data.stories);
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
                $state.error();
            }
        },
        async onSearchTriggered(searchStr) {
            console.log(`Search for "${searchStr}"`);
            this.changeFilter();
            this.$router.push({ name: "search", query: { q: searchStr } });
        },
        async infiniteHandler($state) {
            await this.fetchStories($state);
        },
        changeFilter() {
            console.log("Change filter");
            console.log(`InfiniteId = > ${this.infiniteId}`);
            this.page = 1;
            this.stories = [];
            this.infiniteId += 1;
        },
        updateStory(story) {
            console.log("updating story");
            // console.log(story);
            const [story_to_update] = this.stories.filter(s => s._key === story._key);
            // console.log(story_to_update);
            story_to_update.comments_count = story.comments_count;
        }
    },
    mounted() {
        console.log("Search mounted");
        EventBus.$on("searchTriggered", searchStr => {
            this.onSearchTriggered(searchStr);
        });
    },
    created() {
        // this.searchStr = this.$route.query.q;
    },
    beforeDestroy() {
        console.log("Search beforeDestroyed");
        EventBus.$off("searchTriggered");
    },
    destroyed() {
        console.log("Search destroyed");
    },
    watch: {
        // ----------------------------------------------------------------------
        $route(to, from) {
            // UPDATE NUM COMMENTS IF ROUTE FROM == view-story
            console.log("# --- Watch route --- #");

            console.log("# -------------- #");
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
                    });
            } else if (from.name === "search") {
                console.log("Watcher: search");
            }
        }
    }
};
</script>

<style scoped></style>
