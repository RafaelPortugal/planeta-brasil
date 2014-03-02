function LeftMenu($scope) {
    $scope.itens = [
        {href: '#page1', title: 'Page 1', status: 'active', language: 1},
        {href: '#page2', title: 'Page 2', status: 'deactive', language: 1},
        {href: '#page3', title: 'Page 3', status: 'deactive', language: 1},
        {href: '#page1', title: 'Pagina 1', status: 'active', language: 2},
        {href: '#page2', title: 'Pagina 2', status: 'deactive', language: 2},
        {href: '#page3', title: 'Pagina 3', status: 'deactive', language: 2},
        {href: '#page1', title: 'Paje 1', status: 'active', language: 3},
        {href: '#page2', title: 'Paje 2', status: 'deactive', language: 3},
        {href: '#page3', title: 'Paje 3', status: 'deactive', language: 3},

    ];
    $scope.activeMenu = function(item) {

    	angular.forEach($scope.itens, function(i) {
    		i.status = 'deactive';
    	});
    	item.status = 'active';
    }
}
