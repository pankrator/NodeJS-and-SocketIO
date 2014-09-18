var broadphase = {};

broadphase.spatialGrid = function (minX, maxX, minY, maxY, cellSize, entities) {
    this.cellSize = cellSize;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.entities = entities;

    this.cGridWith = Math.floor((this.maxX - this.minX) / this.cellSize);
    this.cGridHeight = Math.floor((this.maxY - this.minY) / this.cellSize);
    this.totalCells = this.cGridWith * this.cGridHeight;

    this.grid = [[]];
};

broadphase.spatialGrid.prototype.update = function () {
    var entity, cXEntityMin, cXEntityMax, cYEntityMin, cYEntityMax, cX, cY, gridCol, gridCell;

    this.grid = Array(this.cGridWidth);

    for (i = 0; i < this.entities.length; i++) {
        entity = this.entities[i];

        //Check whether entity is outside the spatial grid
        if (entity.x < this.minX || entity.x > this.maxX || entity.y < this.minY || entity.y > this.maxY) {
            continue;
        }

        cXEntityMin = Math.floor((entity.x - this.minX) / this.cellSize);
        cXEntityMax = Math.floor((entity.x + entity.sizeX - this.minX) / this.cellSize);
        cYEntityMin = Math.floor((entity.y - this.minY) / this.cellSize);
        cYEntityMax = Math.floor((entity.y + entity.sizeY - this.minY) / this.cellSize);

        for (cX = cXEntityMin; cX <= cXEntityMax; cX++) {
            if (!this.grid[cX]) {
                this.grid[cX] = Array(this.cGridHeight);
            }

            gridCol = this.grid[cX];

            for (cY = cYEntityMin; cY < cYEntityMax; cY++) {
                if (!gridCol[cY]) {
                    gridCol[cY] = [];
                }

                gridCell = gridCol[cY];

                gridCell.push(entity);
            }
        }
    }
};

broadphase.spatialGrid.prototype.queryForCollisionPairs = function () {
    var checked = {}, pairs = [], gridCol, gridCell, i, j, k, l, entityA, entityB, hashA, hashB;

    for (i = 0; i < this.grid.length; i++) {
        gridCol = this.grid[i];

        if (!gridCol) {
            continue;
        }

        for (j = 0; j < gridCol.length; j++) {
            gridCell = gridCol[j];

            if (!gridCell) {
                continue;
            }

            for (k = 0; k < gridCell.length; k++) {
                entityA = gridCell[k];

                for (l = k + 1; l < gridCell.length; l++) {
                    entityB = gridCell[l];

                    hashA = entityA.id + ":" + entityB.id;
                    hashB = entityB.id + ":" + entityA.id;

                    if (!checked[hashA] && !checked[hashB]) {
                        checked[hashA] = checked[hashB] = true;

                        if (this.aabb2DIntersection(entityA, entityB)) {
                            pairs.push([entityA, entityB]);
                        }
                    }
                }
            }
        }
    }

    return pairs;
};

broadphase.spatialGrid.prototype.aabb2DIntersection = function (objA, objB) {
    var a = objA.getAABB(), b = objB.getAABB();

    if (a.x > b.x + b.size || a.y > b.y + b.size || a.x + a.size < b.x || a.y + a.size < b.y) {
        return false;
    } else {
        return true;
    }
};
