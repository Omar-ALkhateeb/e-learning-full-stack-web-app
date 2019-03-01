export default {

    data: {
        isLoggedIn: localStorage.getItem("token") != null
    },

    // Methods that you need, for e.g fetching data from server etc.

    fetchData() {
        // fetch logic
    }

}