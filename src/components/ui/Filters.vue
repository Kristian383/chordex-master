<template>
  <span
    class="filter-option"
    :class="{ active: filters[filter] }"
    v-for="filter in allFilters"
    :key="filter"
  >
    <input
      type="checkbox"
      :id="filter"
      @change="setFilter"
      v-model="filters[filter]"
    />
    <label :for="filter">{{ filter }}</label>
  </span>
  <!-- <span class="filter-option">
        <input type="checkbox" />
        <label for="favorites">Favorites</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="electric">Electric</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="acoustic">Acoustic</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Easy</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Medium</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Hard</label>
      </span> -->
</template>

<script>
export default {
  // emits:["filters-changed"],
  props:["active"],
  data() {
    return {
      allFilters: ["all","favorites", "acoustic", "electric", "easy", "medium", "hard"],
      filters: {
        all: null,
        acoustic: false,
        electric: false,
        easy: false,
        medium: false,
        hard: false,
        favorites:false
      },
      activeFilter:this.active
    };
  },
  
  methods: {
    setFilter(e) {
      const item = e.target.id;
      if (item == "all") {
        this.filters = {
          all: true,
          acoustic: false,
          electric: false,
          easy: false,
          medium: false,
          hard: false,
          favorites:false
        };
      } else {
        this.filters["all"] = false;
      }

      this.activeFilters=[];
      for(const item in this.filters){
        
        if(this.filters[item]){
          this.activeFilters.push(item)
        }
      }
      console.log("aktivni",this.activeFilters);
      // console.log(this.activeFilters);
      this.$router.replace({query:{filter:this.activeFilters.join(" ")}})
      // this.$store.commit("setActiveFilters",this.filters)
      // this.$emit("filters-changed")
    },
  },
  // mounted(){
  //   if(this.active=="all"){
  //     this.filters.all =true 
  //   }else{
  //     console.log(this.active.split(" "));
  //     const activeInUrl=this.active.split(" ");
  //     activeInUrl.forEach(element => {
  //         this.filters[element]=true;
  //     });
  //     // for(const item in activeInUrl){
  //     //   console.log("item",item);
  //     //   this.filters[item]=true;
  //     // }
  //     console.log(this.filters);
  //   }
  // },
  watch:{
    $route(){
      if(this.$route.query.filter){
        
        console.log("tu u wtach");
      }
      console.log("promjena");
    }
  }
  
};
</script>

<style scoped>
.filter-option.active > label {
  background-color: #242424;
  color: white;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  transition: all 500ms ease;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #e7e7e7;
  padding: 10px 16px;
  border: none;
  display: inline-block;
  user-select: none;
  text-transform: capitalize;

  word-wrap: none;
  white-space: nowrap;
}

input[type="checkbox"]:checked + label {
  transition: all 500ms ease;
  background-color: #242424;
  color: white;
}

/* .filter-option {
  padding: 10px 16px;
  margin-right: 8px;
  border-radius: 16px;
  border: none;

  word-wrap: none;
  white-space: nowrap;
  font-size: inherit;
  text-transform: capitalize;
  background-color: #e7e7e7;
  transition: all 0.2s ease-in;
}

.filter-option input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + label {
  background-color: #242424;
  color: white;
  user-select: none;
}
.filter-option label:hover {
  cursor: pointer;
}
.filter-option:hover {
  color: #f1f1f1;
  background-color: #303030;
  cursor: pointer;
}

.filter-option.active {
  background-color: #242424;
  color: white;
}
.filter-option:last-child {
  margin-right: 0;
} */
</style>