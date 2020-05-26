import { isHorizontal, isVertical } from '../utils/pics';

const CAPTION_MAXLEN = 256;
const DESCRIPTION_MAXLEN = 64;

export const picsUploadedMixin = {
  data() {
    return {
      caption_errors: [],
      description_errors: [],
    };
  },
  methods: {
    isHorizontal,
    isVertical,
    //  removePic
    removePic(idx) {
      this.pics_uploaded.splice(idx, 1);
    },
    draggableChange() {
      // console.log("draggable change");
      // console.log(evt);
      // console.log(this);
      console.log(this.caption_errors);
      this.resetPicsErrors();
    },
    //  hasPicsError
    hasPicsError() {
      return (
        this.caption_errors.length !== 0 || this.description_errors.length !== 0
      );
    },
    //  setCaption
    setCaption(idx, event) {
      // console.log(`setCaption ${idx}`);
      this.pics_uploaded[idx].caption = event.target.value;
      if (this.pics_uploaded[idx].caption.length > CAPTION_MAXLEN) {
        // add error
        if (!this.caption_errors.includes(idx)) {
          this.caption_errors.push(idx);
        }
      } else {
        // remove error if any
        const index = this.caption_errors.indexOf(idx);
        if (index > -1) {
          this.caption_errors.splice(index, 1);
        }
      }
    },
    //  setDescription
    setDescription(idx, event) {
      // console.log(`setDescription ${idx}`);
      this.pics_uploaded[idx].description = event.target.value;
      if (this.pics_uploaded[idx].description.length > DESCRIPTION_MAXLEN) {
        // add error
        if (!this.description_errors.includes(idx)) {
          this.description_errors.push(idx);
        }
      } else {
        // remove error if any
        const index = this.description_errors.indexOf(idx);
        if (index > -1) {
          this.description_errors.splice(index, 1);
        }
      }
    },
    // resetPicsErrors
    resetPicsErrors() {
      // console.log(this.caption_errors);
      // console.log(this.pics_uploaded.length);

      this.caption_errors = [];
      this.description_errors = [];

      for (let i = 0; i < this.pics_uploaded.length; i++) {
        // console.log(i);
        // console.log(this.pics_uploaded[i]);
        if (
          this.pics_uploaded[i].caption &&
          this.pics_uploaded[i].caption.length > CAPTION_MAXLEN
        ) {
          // add error
          this.caption_errors.push(i);
        }
        if (
          this.pics_uploaded[i].description &&
          this.pics_uploaded[i].description.length > DESCRIPTION_MAXLEN
        ) {
          // add error
          this.description_errors.push(i);
        }
      }
    },
  },
};
