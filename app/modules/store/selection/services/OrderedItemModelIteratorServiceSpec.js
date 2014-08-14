//'use strict';

//describe('OrderedItemModelIteratorService', function() {

//beforeEach(module('app'));

//var OrderedItemModelIteratorService;
//beforeEach(inject(function(_OrderedItemModelIteratorService_) {
//OrderedItemModelIteratorService = _OrderedItemModelIteratorService_;
//}));

//describe('for articles', function() {

//var orderedItemModel = {
//orderedArticlesCollection: [{
//articleModel: {
//ingredientCategoriesCollection: [{
//id: 42
//}, {
//id: 88
//}, {
//id: 1
//}]
//}
//}]
//};

//it('should return the first ingredient category', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(42);
//expect(type).toBe('ingredient');

//});

//it('should return the third ingredient category', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.next();

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(1);
//expect(type).toBe('ingredient');

//});

//it('should return the second ingredient category', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.prev();

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(88);
//expect(type).toBe('ingredient');

//});

//});

//describe('for menus', function() {

//var orderedItemModel = {
//orderedArticlesCollection: [{
//articleModel: {
//ingredientCategoriesCollection: [{
//id: 42
//}]
//}
//}, {
//articleModel: {
//ingredientCategoriesCollection: [{
//id: 88
//}, {
//id: 1
//}]
//}
//}]
//};

//it('should return the first ingredient category of the first ordered article', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(42);
//expect(type).toBe('ingredient');

//});

//it('should return the second ingredient category of the second ordered article', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.next();

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(1);
//expect(type).toBe('ingredient');

//});

//it('should return the second ingredient category', function() {

//OrderedItemModelIteratorService.init(orderedItemModel);

//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.next();
//OrderedItemModelIteratorService.prev();

//var entity = OrderedItemModelIteratorService.getEntity();
//var type = OrderedItemModelIteratorService.getType();

//expect(entity.id).toBe(88);
//expect(type).toBe('ingredient');

//});

//});

//});
