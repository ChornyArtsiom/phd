var vm = new Vue({
    el: '#app',
    data: {
        uri: 'https://raw.githubusercontent.com/ChornyArtsiom/phd/dev/data/',
        uriFormat: '.json',
        listPath: 'list.json',
        list: [],
        listCodes: [],
        listNames: [],
        activeCatCode: '',

        error: '',
        item: '',
        code: '',
        search: '',
        categoryName: '',
        categoryList: [],
        tips: [],
        array: []
    },
    created: function() {
        axios.get(this.uri + this.listPath)
            .then(response => { this.list = response.data });
    },
    computed: {
        filteredList: function() {
            return this.tips.filter(post => {
                if (this.search != '' && post.category == this.categoryName)
                    return post.code.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        setCategoryList: function() {
            this.listCodes = (Array.from(this.list)).map(ex => ex.categoryCode).filter((v, i, a) => a.indexOf(v) === i);
            this.listNames = (Array.from(this.list)).map(ex => ex.categoryName).filter((v, i, a) => a.indexOf(v) === i);
            return this.listNames;
        }

    },
    methods: {
        setCategory(item) {
            this.categoryName = item;
            this.activeCatCode = this.listCodes[this.listNames.indexOf(item)];

            axios.get(this.uri + this.activeCatCode + this.uriFormat)
            .then(response => { this.tips = response.data });

            console.log((Array.from(this.tips)).map(ex => ex.categoryName));

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