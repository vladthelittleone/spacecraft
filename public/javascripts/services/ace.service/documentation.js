'use strict';

/**
 * Created by Ivan on 24.06.2016.
 */


var documentation =
{
	empty:{
		functions:[
			{"name": "BbotDebug(string)"}
		]
	},

	world:{
		functions:[
			{"name": "getEnemies(callback)"},
			{"name": "getBonuses(callback)"},
			{"name": "getBounds()"}
		]
	},

	spaceCraft:{
		functions:[
			{"name": "weapon"},
			{"name": "engine"},
			{"name": "protection"},
			{"name": "getX()"},
			{"name": "getY()"},
			{"name": "getAngle()"},
			{"name": "angleBetween(another)"},
			{"name": "distance(another)"},
			{"name": "getId()"},
			{"name": "getFreePoints()"},
			{"name": "getMaxEnergy()"}
		]
	},

	engineBlock:{
		functions:[
			{"name": "moveSpeed"},
			{"name": "rotateLeft()"},
			{"name": "rotateRight()"},
			{"name": "rotateTo(another)"},
			{"name": "moveForward()"},
			{"name": "moveBackward()"},
			{"name": "moveTo(x,y)"},
			{"name": "moveToNearestBonus()"},
			{"name": "getMoveSpeed()"}
		]
	},

	weaponBlock:{
		functions:[
			{"name": "rate"},
			{"name": "range"},
			{"name": "damage"},
			{"name": "getDamage()"},
			{"name": "getFireRate()"},
			{"name": "getFireRange()"},
			{"name": "inRange(another)"},
			{"name": "fire(obj1, obj2)"},
			{"name": "enemiesInRange(callback)"},
			{"name": "fireNearestEnemy()"}
		]
	},
	protectionBlock:{
		functions:[
			{"name": "regeneration"},
			{"name": "getHealth()"},
			{"name": "getShield()"},
			{"name": "getRegeneration()"}
		]
	},
	
	bonus:{
		functions:[
			{"name": "getX()"},
			{"name": "getY()"},
			{"name": "getType()"},
			{"name": "getId()"}
		]
	},
	
	enemy:{
		functions:[
			{"name": "weapon"},
			{"name": "getHealth()"},
			{"name": "getShield()"},
			{"name": "getX()"},
			{"name": "getY()"},
			{"name": "getAngle()"},
			{"name": "angleBetween(another)"},
			{"name": "distance(another)"},
			{"name": "getId()"}
		]
	},
	
	enemyWeapon:{
		functions:[
			{"name": "getDamage()"},
			{"name": "getFireRate()"},
			{"name": "getFireRange()"},
			{"name": "inRange(another)"},
			{"name": "enemiesInRange(callback)"},
			{"name": "getAngle()"},
			{"name": "angleBetween(another)"},
			{"name": "distance(another)"},
			{"name": "getId()"}
		]
	},
	
	module:{
		functions:[
			{"name": "inc(i)"},
			{"name": "dec(i)"},
			{"name": "getMax()"},
			{"name": "getEnergyPoints()"},
			{"name": "get(p)"}
		]
	}
};
