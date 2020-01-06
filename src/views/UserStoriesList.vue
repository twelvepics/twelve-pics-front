<template>
    <main>
        <!-- STORIES COLUMN -->
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-three-quarters-desktop">
                <!-- START LOADER / SERVER ERRORS-->
                <page-loader v-if="is_loading"></page-loader>
                <page-error v-else-if="is_error" :errorMessage="errorMessage"></page-error>
                <!-- ENDS LOADER / SERVER ERRORS-->
                <!-- START STORIES -->
                <div v-else class="card">
                    <!-- CARD CONTENT -->
                    <div class="card-content">
                        <p class="title is-size-4">
                            Stories posted by {{ user_info.display_name || user_info.username }}
                        </p>
                        <p class="subtitle is-size-6">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore harum, facilis praesentium
                            esse veritatis nemo!
                        </p>
                        <!-- STORIES -->
                        <user-story
                            v-for="(story, idx) in stories"
                            :key="idx"
                            :story="story"
                            :user_info="user_info"
                        ></user-story>
                        <!-- END STORIES -->
                    </div>
                </div>
                <!-- ENDS STORIES -->
            </div>
        </div>
        <!-- ENDS STORIES COLUMN -->
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import axiosBase from "../services/axiosBase";
import UserStory from "../components/UserStory.vue";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import * as Sentry from "@sentry/browser";

export default {
    components: {
        UserStory,
        PageLoader,
        PageError
    },
    data() {
        return {
            is_debug: true,
            is_loading: false,
            // fetch errors
            is_error: false,
            errorMessage: "",
            //
            stories: [],
            user_info: {},
            count: 0,
            fullCount: 0,
            username: this.$route.params.username
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser"])
    },
    methods: {
        async fetchData() {
            try {
                console.log("fetch data");
                this.is_loading = true;
                // await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await axiosBase.get(`/users/${this.username}/stories`);
                // console.log(response.data);
                const { stories, count, fullCount, user_info } = response.data;
                for (let story of stories) {
                    story.num_comments = Math.floor(Math.random() * 10);
                }
                this.stories = stories;
                this.count = count;
                this.fullCount = fullCount;
                this.user_info = user_info;
                this.is_loading = false;
            } catch (e) {
                this.is_loading = false;
                this.is_error = true;
                if (e.response) {
                    if (e.response.status === 404) {
                        this.errorMessage = "USER NOT FOUND";
                    } else {
                        // Most probably a 500
                        this.errorMessage = "SERVER ERROR";
                    }
                } else {
                    Sentry.captureException(e);
                    console.log(e);
                }
            }
        }
    },
    created() {
        this.fetchData();
    },
    watch: {
        // eslint-disable-next-line
        $route(to, from) {
            console.log("route changed");
            this.username = this.$route.params.username;
            // react to route changes...
            this.fetchData();
        }
    }
};
</script>

<style>
/************** layout ***********/
html,
body {
    width: 100%;
    height: 100%;
}
#app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
main {
    flex-grow: 1;
}
navbar,
main,
footer {
    flex-shrink: 0;
}
main {
    margin-top: 90px;
}
footer {
    margin-top: 30px;
}
</style>
