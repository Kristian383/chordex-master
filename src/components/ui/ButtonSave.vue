<template>
  <div class="button-container">
    <button class="btn"></button>
  </div>
</template>

<style scoped>
/* button */
.button-container {
  position: relative;
  width: 5rem;
  height: 2.5rem;
}
.button-container button {
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  color: #fff;
  outline: none;
  background-color: #6fc982;
  border: 2px #1abc9c;
  border-radius: 100px;
}
.button-container button:before {
  content: "Save";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 21px;
}
.button-container button:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4),
    0 5px 10px -1px rgba(51, 51, 51, 0.3);
}
.button-container button.loading:hover,
.button-container button.success:hover {
  box-shadow: none;
}
.button-container button.loading {
  pointer-events: none;
  width: 2.5rem;
  border-radius: 50%;
}
.button-container button.loading:before {
  opacity: 0.75;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.25s linear infinite;
  animation: spin 0.25s linear infinite;
}
.button-container button.success {
  pointer-events: none;
  background-color: #6fc982;
  width: 50px;
  border-radius: 50%;
  color: var(--white);
  font-size: inherit;
  -webkit-animation: pop 260ms forwards 1;
  animation: pop 260ms forwards 1;
}
.button-container button.success:before {
  opacity: 0.75;
  font-size: inherit;
  text-rendering: auto;
  content: "\2713";
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@-webkit-keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes pop {
  0% {
    transform: scale(0);
  }
  85% {
    transform: scale(1.2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
}
@keyframes pop {
  0% {
    transform: scale(0);
  }
  85% {
    transform: scale(1.2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
}
</style>