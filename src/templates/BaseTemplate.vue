<template>
  <div id="page">
    <div id="header"></div>
    <slot id="view"></slot>
  </div>
</template>

<style>
#page {
  width: 1wh;
  height: 1;
}

#header {
  height: 50px;
  width: 1;
  background-color: blue;
}
</style>
