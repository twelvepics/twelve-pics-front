<template>
    <main>
        <div class="columns is-centered">
            <!-- CENTER COLUMNN -->
            <div class="column is-full-tablet is-four-fifths-desktop is-four-fifths-widescreen is-four-fifths-fullhd">
                <!-- START LOADER / SERVER ERRORS-->
                <page-loader v-if="is_loading"></page-loader>
                <page-error v-else-if="is_error" :errorMessage="errorMessage"></page-error>
                <!-- ENDS LOADER / SERVER ERRORS-->
                <div v-else>
                    <!-- START STORY -->
                    <story :story="story"></story>
                    <!-- END STORY -->
                    <!-- START COMMENTS -->
                    <story-comments :story_key="story._key" v-if="story.allow_comments"></story-comments>
                    <!-- END COMMENTS -->
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Story from "../components/Story";
import StoryComments from "../components/StoryComments";
import PageLoader from "../components/PageLoader.vue";
import PageError from "../components/PageError.vue";
import axiosBase from "../services/axiosBase";
import * as Sentry from "@sentry/browser";

export default {
    components: {
        Story,
        StoryComments,
        PageLoader,
        PageError
    },
    data() {
        return {
            is_debug: true,
            is_loading: true,
            // fetch errors
            is_error: false,
            errorMessage: "",
            //
            story: null,
            comments: []
        };
    },
    props: {},
    methods: {
        async fetchData() {
            try {
                this.is_loading = true;
                // GET STORY
                const slug = this.$route.params.slug;
                // await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await axiosBase.get(`/stories/${slug}`);
                this.story = response.data.story;
                // GET COMMENTS
                this.is_loading = false;
            } catch (e) {
                this.is_loading = false;
                this.is_error = true;
                if (e.response) {
                    if (e.response.status === 404) {
                        this.errorMessage = "STORY NOT FOUND";
                    } else {
                        // Most probably a 500
                        this.errorMessage = "SERVER ERROR";
                    }
                } else {
                    console.log(e);
                    Sentry.captureException(e);
                }
            }
        }
    },
    created() {
        console.log("StoryStandalone created");
        this.fetchData();
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
/************** spacing ***********/
</style>
