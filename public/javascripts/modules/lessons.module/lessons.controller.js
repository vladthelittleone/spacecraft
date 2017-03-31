'use strict';

LessonsController.$inject = ['$scope'];

module.exports = LessonsController;

/**
 * Контроллер, отвечающий за окно выбора уроков.
 *
 * @since 30.11.15
 * @author Skurishin Vladislav
 */
function LessonsController($scope) {

	VK.Widgets.CommunityMessages("vkCommunityMessages", 105816682, {
		widgetPosition: "right",
		disableExpandChatSound: "1",
		disableButtonTooltip: "1",
	});

}
