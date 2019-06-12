<template>
  <b-modal :active="active" :width="600" scroll="keep" @close="closeModal()">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">The Decentralized Death Note</p>
            <p class="subtitle is-6">How To Use It ?</p>
          </div>
        </div>

        <div class="content">
          <ol class="is-lower-alpha has-text-left">
            <li>
              The Human whose name is written in this note shall die. This note
              will not take effect unless the writer has the subject's face in
              mind when writing his/her name. This is to prevent people who
              share the same name from being affected.
            </li>
            <li>
              The Death Note will not ever affect a person whose name has been
              misspelled four times.
            </li>
            <li>
              When the same name is written in two or more Death Notes within
              0.06 seconds, the entry is regarded as simultaneous; the Death
              Notes will not take effect and the individual will not die.
            </li>
            <li>
              When the same name is written in two or more Death Notes, the note
              which was used first will take effect, regardless of the time of
              death.
            </li>
            <li>
              If a Death Note owner accidentally misspells a person's name four
              times, that person will be free from being killed by the Death
              Note. However, if the Death Note owner intentionally misspells the
              name four times, the owner will die.
            </li>
            <li>
              The Death Note will not take effect if the victim's name is
              written on several different pages. However, the front and back of
              a page is considered to be one page. For example, the Death Note
              will take effect if the victim's last name is written on the front
              page and first name on the back.
            </li>

            <li>
              If the cause of death is written within 40 seconds of the
              subject's name, it will happen.
            </li>
            <li>
              If the cause of death isn't specified, the victim dies of a heart
              attack in 40 seconds. However, the rule can be delayed for
              twenty-three days, meaning you can write down "dies by heart
              attack in [xx] days."
            </li>
            <li>
              After writing the cause of death, the details of the death should
              be entered within the next 6 minutes and 40 seconds.
            </li>
            <li>
              If the time of death is specified within 40 seconds after writing
              the cause of death as a heart attack, the time of death can be
              manipulated and can go into effect within 40 seconds after writing
              the name.
            </li>
            <li>
              The conditions of death will not be realized unless they are
              physically possible for that human or could be reasonably assumed
              to be carried out by that human. Although it is possible to
              control a person's actions, if an impossible situation is written
              down the person will simply die of a heart attack.
            </li>
            <li>
              You may write the cause and/or death prior to filling in the name
              of the individual. Be sure to insert the name in front of the
              cause of death. You have about 19 days (according to the human
              calendar) to fill in a name.
            </li>
            <li>
              After an individual's name, time of death, and conditions of death
              are entered in the notebook, the time and conditions of death may
              be altered as many times as desired as long as they are changed
              within six minutes and 40 seconds from the time they are filled
              in. But, of course, this is only possible before the victim dies.
            </li>
            <li>
              If you write "dies of accident" for the cause of death, the victim
              will die from a natural accident six minutes and 40 seconds after
              the time of entry. "Accident" is a condition of death, so six
              minutes and 40 seconds are provided to write down additional
              details. The conditions do not take effect until this time has
              passed.
            </li>
          </ol>
        </div>
        <small>Kira - 6:23 PM - 28 Nov 2003</small>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    closeModal() {
      this.$emit("toggle-rules-modal", false);
    }
  },
  watch: {
    isActive: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.active = val;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
