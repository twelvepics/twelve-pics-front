<template>
    <div class="test">
        <p>Test init</p>
        <p>isAuthenticated: {{ isAuthenticated }}</p>
        <p>user: {{ authenticatedUser && authenticatedUser.username }}</p>
        <p>display name: {{ authenticatedUser && authenticatedUser.profile.display_name }}</p>
        <p>isUserInited: {{ isUserInited }}</p>
        <p v-if="isUserInited">I am refreshed</p>
        <p><input type="text" v-model="test" />{{ test }}</p>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    ////////////////////////////////////////////////////////////////////
    // Use this pattern on home page to load stories from categories
    // and maybe on profile too (Not so required though)
    ////////////////////////////////////////////////////////////////////
    data() {
        return {
            test: "",
            userLoaded: false
        };
    },
    methods: {
        ///////////////////////////////////////////////////////////////////////////////////////////////
        // if isUserInited => normal flow all has been inited before, proper data is fetched by created
        // if !isUserInited => first load or reload, await for updated event to fetch proper data
        ///////////////////////////////////////////////////////////////////////////////////////////////
        getData(by) {
            if (this.isUserInited) {
                if (!this.userLoaded) {
                    this.userLoaded = true;
                }
                console.log(`getData call by ${by}`);
                console.log(this.authenticatedUser.categories);
            }
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "authenticatedUser", "isUserInited"])
    },
    created() {
        console.log("CREATED");
        this.getData("created");
    },
    mounted() {
        console.log("MOUNTED");
    },
    updated() {
        console.log("UPDATED");
        if (!this.userLoaded) {
            // created returned without calling getData because user was not refreshed yet
            // !!! works perfect even if updated called for another reason
            console.log("UPDATED CALLED REFRESH");
            this.getData("updated");
        }
    }
};
</script>
<style scoped>
.test {
    margin-top: 100px;
    padding-left: 50px;
}
input {
    margin-right: 15px;
}
</style>
