<template>
    <!-- START MAIN CONTENT -->
    <main>
        <div class="container is-fluid">
            <div class="columns">
                <div class="column auto">
                    <!-- STORIES -->
                    <story-brief v-for="(story, idx) in stories" :key="idx" :story="story"></story-brief>
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
import { mapActions } from "vuex";
import axiosBase from "../services/axiosBase";
import StoryModal from "../components/StoryModal.vue";
import StoryBrief from "../components/StoryBrief.vue";
///////////////////////////////////////
// @ is an alias to /src
///////////////////////////////////////
export default {
    name: "home",
    data: function() {
        return {
            stories: []
        };
    },
    methods: {
        ...mapActions(["resetStoryComponentMounted"]),
        async fetchStories() {
            try {
                // await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await axiosBase.get(`/stories`);
                console.log(response.data.stories);
                const stories = response.data.stories;
                for (let story of stories) {
                    story.num_comments = Math.floor(Math.random() * 10);
                }
                this.stories = stories;
                this.is_loading = false;
            } catch (e) {
                this.is_loading = false;
                this.is_error = true;
                if (e.response.status === 404) {
                    this.errorMessage = "USER NOT FOUND";
                } else {
                    // Most probably a 500
                    this.errorMessage = "SERVER ERROR";
                }
            }
        }
    },
    components: {
        StoryBrief
    },
    created() {
        // get stories
        this.fetchStories();
    },
    watch: {
        $route(to, from) {
            // console.log(to);
            // console.log(from);
            if (from.name === "view-story") {
                this.resetStoryComponentMounted();
            }
        }
    }
};
</script>

<style scoped></style>
