'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
angular.module('spacecraft', [
    'ui.router',
    'ui.ace',
    'spacecraft.main'
])
    .config(['$urlRouterProvider', function ($urlRouterProvider)
    {
        // For any unmatched url, send to ""
        $urlRouterProvider.otherwise("/");
    }]);

commit 537b7ef6f98e93034e203a814a9dadbecbc1e03f
Author: vaimer <overespada@gmail.com>
Date:   Wed Oct 14 12:42:36 2015 +0400

'small_change'

commit 56f13e5ae9f47d0a679ed8362e93408619c18d8c
Author: vaimer <overespada@gmail.com>
Date:   Wed Oct 14 01:03:39 2015 +0400

'resolve_problem_binding'

commit 1b9e60f87cd2d43cca4e0b1477925a52bf69f8e2
Author: vaimer <overespada@gmail.com>
Date:   Wed Oct 14 00:24:11 2015 +0400

'create_new_view'

commit f30f08b4c4a30748c2e332cd53ab2fafa1f4880a
Author: vaimer <overespada@gmail.com>
Date:   Tue Oct 13 22:18:07 2015 +0400

'add_health_to_spacecraft'

commit 205341232a461215ee2b653c82fd409910053ec5
Merge: 2e37327 de93660
Author: vaimer <overespada@gmail.com>
Date:   Tue Oct 13 22:12:19 2015 +0400

'after_merdge'

commit 2e3732724a4fc6bbe3cebf68e64c52fc3ef60674
Author: vaimer <overespada@gmail.com>
Date:   Tue Oct 13 22:05:53 2015 +0400

'xz'
