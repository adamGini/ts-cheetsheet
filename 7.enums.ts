// enum is short for Enumeration

enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}

const isLoading = (state: LoadingState) => state === LoadingState.loading;

console.log(isLoading(LoadingState.loaded)); //will print false

// note that we dont have to assign a value, in which case the "states" would be represented by a number starting from 0

enum LoadingState2 {
    beforeLoad,
    loading,
    loaded,
}

const isLoading2 = (state: LoadingState2) => state === 0;

console.log(isLoading2(LoadingState2.loaded)); //will print false

