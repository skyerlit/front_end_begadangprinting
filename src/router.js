import Vue from 'vue'
import VueRouter from 'vue-router'

    Vue.use(VueRouter)

    function importComponent(path) {
        return () => import(`./components/${path}.vue`)
    }

    Vue.use(VueRouter)

    const router = new VueRouter({
        mode: "history",
        routes: [
        {
            path: "/",
            //name: "admin",
            component: importComponent('DashboardLayout'),
            children: [
            //Dashboard
            
                {
                    path: "/",
                    name: "Root",
                    component: importComponent('Dashboard'),
                },
                    // To do list
                {
                    path: "/profil",
                    name: "Profil",
                    meta: {title: 'Profile'},
                    component: importComponent('TodoList/Profil'),
                },
                {
                    path: "/order",
                    name: "Order",
                    meta: {title: 'Order'},
                    component: importComponent('TodoList/Order'),
                },
                {
                    path: "/list",
                    name: "Order List",
                    component: importComponent('TodoList/List'),
                },
                {
                    path: "/promo",
                    name: "Promo",
                    component: importComponent('TodoList/Promo'),
                },
                
                {
                    path: "/register",
                    name: "Register",
                    component: importComponent('TodoList/Register'),
                },
                
            ]
        },

        {
            path: "/login",
            name: "Login",
            meta: {title: 'Login'},
            component: importComponent('Login'),
        },
        {
            path: '*',
            redirect: '/'
            
        },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if(to.name != 'Login' && localStorage.getItem('token') == ''){
        next({ path: '/login' })
    }
    else if(to.name == 'Login' && localStorage.getItem('token') != ''){
        next({ path: 'profil'})
    }
    next()
});

export default router;