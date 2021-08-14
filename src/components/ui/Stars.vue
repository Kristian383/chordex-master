<template>
  <div class="rating rating2">
    <font-awesome-icon icon="star" class="star"></font-awesome-icon>
    <font-awesome-icon icon="star" class="star"></font-awesome-icon>
    <font-awesome-icon icon="star" class="star"></font-awesome-icon>
    <font-awesome-icon icon="star" class="star"></font-awesome-icon>
    <font-awesome-icon icon="star" class="star"></font-awesome-icon>

    <!-- href="#5"
href="#4"
href="#3"
href="#2"
href="#1" -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.rating {
  width: 100%;
  text-align: center;
  font-size: 25px;
  overflow: hidden;
  position: relative;
}

.rating .star {
  color: #aaa;
  text-decoration: none;
  transition: color 0.4s;
}

.rating .star:hover,
.rating .star:hover ~ .star,
.rating .star:focus,
.rating .star:focus ~ .star {
  color: orange;
  cursor: pointer;
}
.rating2 {
  direction: rtl;
}
.rating2 .star {
  float: none;
}
.checked {
  color: orange;
}
</style>