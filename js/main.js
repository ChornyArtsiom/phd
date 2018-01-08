var vm = new Vue({
    el: '#app',
    data: {
        item: '',
        code: '',
        search: '',
        categoryName: '',
        categoryList: [],
        tips: [],
        array: []
    },
    created: function() {
        axios.get("https://raw.githubusercontent.com/ChornyArtsiom/phd/gh-pages/data.json")
            .then(response => { this.tips = response.data })
    },
    computed: {
        filteredList: function() {
            return this.tips.filter(post => {
                if (this.search != '' && post.category == this.categoryName)
                    return post.code.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        setCategoryList: function() {
            return ((Array.from(this.tips)).map(ex => ex.category)).filter((v, i, a) => a.indexOf(v) === i);
        }

    },
    methods: {
        setCategory(item) {
            this.categoryName = item;

        },
        clearCategory() {
            this.categoryName = '';

        },
        clearQuery() {
            this.$refs.search.focus();
            this.search = '';
        }
    },
    filters: {
        count(ob) {
            if (Object.keys(ob).length == 0)
                return ('Ничего не найдено.');
            else
                return Object.keys(ob).length;
        }
    }

});

// Scroll to top
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("toTopBtn").style.display = "block";
    } else {
        document.getElementById("toTopBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0; // for human browser
}
// console.log(vm);