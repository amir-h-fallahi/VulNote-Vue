const Home = {
    template: `
        <div class="mt-16 mb-5 text-center">
            <h1 class="text-3xl md:text-5xl font-extrabold">
                <span
                class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
                >XSS in Vue.js ∞ Security Flaws Lab
                </span>
            </h1>
            <br>
            <p class="mt-3 text-gray-600 dark:text-gray-300 font-semibold text-xl md:text-2xl">
            VulNote Vulnerable Note Taking Project
            </p>
            <br>
            <router-link
                to="/laboratory"
                class="my-2 p-2 inline-block text-white outline-none rounded-lg w-52 font-semibold text-lg bg-violet-700 hover:bg-violet-800 hover:outline-double hover:outline-2 hover:outline-gray-200"
            >
                Let's go
            </router-link>
        </div>
        <img class="max-w-sm block mx-auto" src="./hacker-animate.svg" alt="hacker animate" />
    `
}
const Laboratory = {
    template: `
        <div class="p-2">
            <div class="max-w-2xl my-10 rounded-md shadow-md p-3 mx-auto bg-slate-100/60 dark:bg-slate-900/60">
                <div class="p-1">
                    <label class="block font-semibold text-xl mb-1" for="title">Title</label>
                    <input id="title" v-model="title" type="text" placeholder="enter the title of note..."
                    class="outline-none rounded-md p-2 w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus:bg-slate-950"
                    />
                </div>
                <div class="p-1">
                    <label class="block font-semibold text-xl mb-1" for="text">Reference</label>
                    <input v-model="reference" id="reference" placeholder="enter the reference of note..."
                    class="outline-none rounded-md p-2 w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus:bg-slate-950"
                    />
                </div>
                <div class="p-1">
                    <label class="block font-semibold text-xl mb-1" for="text">Text</label>
                    <textarea v-model="text" id="text" placeholder="enter your note..."
                    class="outline-none h-64 rounded-md p-2 w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus:bg-slate-950"
                    ></textarea>
                </div>
                <div class="p-1">
                    <button type="button" @click="saveNote"
                    class="rounded-lg p-2 block w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold text-lg hover:outline-double hover:outline-2 hover:outline-gray-200"
                    >
                    Save Note
                    </button>
                </div>
                <div class="p-1">
                    <button type="button" @click="deleteNotes"
                    class="rounded-lg p-2 block w-full bg-rose-700 hover:bg-rose-800 text-white font-semibold text-lg hover:outline-double hover:outline-2 hover:outline-gray-200"
                    >
                    Delete Notes
                    </button>
                </div>
            </div>

            <div class="max-w-2xl mx-auto">
                <div class="rounded p-4 my-2 block w-full bg-slate-100/60 dark:bg-slate-900/60" v-for="note in notes">
                    <div class="flex items-center justify-between pb-4 mb-4 border-b">



                        <h2 class="font-semibold text-2xl" :id="note.id" v-html="note.title" ></h2>
                        <!-- <h2 class="font-semibold text-2xl" :id="note.id" v-text="note.title" ></h2> -->
                        <!-- <h2 class="font-semibold text-2xl" :id="note.id" >{{ note.title }}</h2> -->



                        <div class="text-end text-xs">{{ timeConverter(note.savedAt) }}</div>
                    </div>



                    <a :href="note.reference">Go to {{ note.reference }}</a>
                    <!-- <a :href="note.reference" target="_blank">Go to {{ note.reference }}</a> -->
                    <!-- <template v-if="validateScheme(note.reference)">
                        <a :href="note.reference">Go to {{ note.reference }}</a>
                    </template> -->



                    <p class="text-sm text-gray-800 dark:text-gray-300" v-html="note.text"></p>
                    <!-- <p class="text-sm text-gray-800 dark:text-gray-300" v-text="note.text"></p> -->
                    <!-- <p class="text-sm text-gray-800 dark:text-gray-300">{{ note.text }}</p> -->


                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            notes: [],
            title: '',
            reference: '',
            text: ''
        }
    },
    mounted: function () {
        this.title
        this.reference
        this.text
    },
    beforeMount: function () {
        if (localStorage.getItem('notes') == null) {
            localStorage.setItem('notes', '[]')
        }
        this.notes = JSON.parse(localStorage.getItem('notes'))
    },
    methods: {
        saveNote: function (event) {
            if ("".includes(this.title) || "".includes(this.text)) {
                return null
            }
            let notes = JSON.parse(localStorage.getItem('notes'))
            let note = { id: uuidv4(), title: this.title, reference: this.reference, text: this.text, savedAt: Date.now() }
            notes.push(note)
            this.notes.push(note)
            localStorage.setItem('notes', JSON.stringify(notes))
            this.title = ''
            this.reference = ''
            this.text = ''
            setTimeout(()=>{
                document.getElementById(note["id"]).scrollIntoView({ behavior: "smooth" })
            }, 1)
        },
        deleteNotes: function () {
            if (localStorage.getItem('notes')) {
                localStorage.setItem('notes', '[]')
                this.notes = []
            }
        },
        validateScheme: function (url) {
            try {
                scheme = new URL(url).protocol
                trustedSchemes = ["http:", "https:"]
                if (trustedSchemes.includes(scheme)) {
                    return url
                } else {
                    return false
                }
            } catch (error) {
                if (error instanceof TypeError) {
                    return false
                }
            }
        },
        timeConverter: function (timestamp) {
            var a = new Date(timestamp)
            var months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
            var year = a.getFullYear()
            var month = months[a.getMonth()]
            var date = a.getDate()
            var hour = a.getHours()
            var min = a.getMinutes()
            var sec = a.getSeconds()
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
            return time
        }
    }
}


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
}


if (localStorage.getItem('secret') == null) {
    localStorage.setItem('secret', uuidv4())
}

const routes = [
    { path: '/', component: Home },
    { path: '/laboratory', component: Laboratory }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({
    data() {
        return {}
    }
})

app.use(router)

app.mount('#app')
