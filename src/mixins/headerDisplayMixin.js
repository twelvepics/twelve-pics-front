export const headerDisplayMixin = {
  computed: {
    disablePostStoryButton: function() {
      return ['create-story', 'edit-story'].includes(this.$route.name);
    },
    showCatsSelectButton: function() {
      return ['home', 'search'].includes(this.$route.name);
    },
    showSearchBox: function() {
      return ['home', 'search'].includes(this.$route.name);
    },
    isSearch: function() {
      return this.$route.name === 'search';
    },
  },
};
