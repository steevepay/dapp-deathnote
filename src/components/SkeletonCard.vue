<template>
  <div class="card">
    <div class="card-content">
      <div class="media" style="margin-bottom:15px">
        <div class="media-left">
          <figure class="image is-48x48">
            <!-- // IMG -->
            <circle-skeleton />
          </figure>
        </div>
        <div class="media-content">
          <square-skeleton
            :count="1"
            :boxProperties="{
              bottom: '15px',
              width: '100px',
              height: '15px'
            }"
          />
        </div>
      </div>

      <div class="content">
        <square-skeleton
          :count="2"
          :boxProperties="{
            bottom: '10px',
            width: '250px',
            height: '15px'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
