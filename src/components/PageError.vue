<template>
    <div class="card errorcard">
        <div class="isError">{{ errorMessage }}</div>
    </div>
</template>
<script>
export default {
    props: ["errorMessage"]
};
</script>
<style scoped>
.errorcard {
    text-align: center;
    height: 60px;
    padding-top: 10px;
    margin-bottom: 10px;
}
.isError {
    margin-top: 7px;
}
</style>
