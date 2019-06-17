<template>
  <div class="card">
    <div class="card-content">
      <skeleton-loading>
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
                width: '145px',
                height: '15px'
              }"
            />
            <square-skeleton
              :count="1"
              :boxProperties="{
                bottom: '0px',
                width: '80px',
                height: '10px'
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
      </skeleton-loading>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
