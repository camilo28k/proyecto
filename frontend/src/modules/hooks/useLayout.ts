
export function useLayout(pathname: string) {
    const route = [{
        path: '/',
        name: 'Main Section'   
    },
    {
        path: '/categorys',
        name: 'Categorys'    
    },
    ];

    const title = pathname === '/'
    ? 'Main Section'
    : 'Categorys';
    return {
        title, route
        
    }
}