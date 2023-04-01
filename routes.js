const AuthenticationController = require('./controllers/AuthenticationController');
const ProfileController = require('./controllers/ProfileController');
const ProgrammesController = require('./controllers/ProgrammesController');
const UsersController = require('./controllers/UsersController');
const OfficesController = require('./controllers/OfficesController');
const GenerationsController = require('./controllers/GenerationsController');
const ExecutivesController = require('./controllers/ExecutivesController');
const UnitsController = require('./controllers/UnitsController');
const EventsController = require('./controllers/EventsController');
const ContentsController = require('./controllers/ContentsController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
module.exports = (app) => {
    // Auth Module

    app.post('/register',
        AuthenticationControllerPolicy.register, 
        AuthenticationController.register);
    app.post('/login',
        AuthenticationController.login);
    app.get('/user/:id', 
        AuthenticationController.user);
    app.post('/removeImage', 
        AuthenticationController.removeImage);

    // Profile Module
    app.put('/account/:user_id', 
        ProfileController.account);
    app.put('/password/:user_id', 
        ProfileController.password);

    // Programmes Module
    app.get('/programme/:id',
        ProgrammesController.programme);
    app.get('/programmes',
        ProgrammesController.programmes);
    app.post('/programme',
        ProgrammesController.new_programme);
    app.put('/programme/:programme_id',
        ProgrammesController.update_programme);
    app.delete('/programme/:programme_id',
        ProgrammesController.delete_programme);

    // Users Module
    app.get('/users',
        UsersController.users);
    app.post('/user',
        UsersController.new_user);
    app.delete('/user/:id',
        UsersController.delete_user);

    // Offices Module
    app.get('/offices',
        OfficesController.offices);
    app.get('/office/:id',
        OfficesController.office);
    app.post('/office',
        OfficesController.new_office);
    app.put('/office/:id',
        OfficesController.update_office);
    app.delete('/office/:id',
        OfficesController.delete_office);

    // Generations Modules
    app.get('/generations',
        GenerationsController.generations);
    app.get('/generation/:id',
        GenerationsController.generation);
    app.post('/generation',
        GenerationsController.new_generation);
    app.put('/generation/:id',
        GenerationsController.update_generation);
    app.delete('/generation/:id',
        GenerationsController.delete_generation);

    // Executives Modules
    app.get('/executives',
        ExecutivesController.executives);
    app.get('/executives/:gen_id',
        ExecutivesController.generation_executives);
    app.get('/executive/:id',
        ExecutivesController.executive);
    app.post('/executive',
        ExecutivesController.new_executive);
    app.put('/executive/:id',
        ExecutivesController.update_executive);
    app.delete('/executive/:id',
        ExecutivesController.delete_executive);

    // Units Modules
    app.get('/units',
        UnitsController.units);
    app.get('/unit/:id',
        UnitsController.unit);
    app.post('/unit',
        UnitsController.new_unit);
    app.put('/unit/:id',
        UnitsController.update_unit);
    app.delete('/unit/:id',
        UnitsController.delete_unit);

    app.get('/units_details/:gen_id/:unit_id',
        UnitsController.units_details);
    app.get('/unit_details/:gen_id',
        UnitsController.units_details_by_gen_id);
    app.get('/unit_details/:unit_id',
        UnitsController.units_details_by_unit_id);
    app.get('/unit_detail/:id',
        UnitsController.unit_detail);
    app.post('/unit_detail',
        UnitsController.new_unit_detail);
    app.put('/unit_detail/:id',
        UnitsController.update_unit_detail);
    app.delete('/unit_detail/:id',
        UnitsController.delete_unit_detail);

    // Events Modules
    app.get('/events',
        EventsController.events);
    app.get('/event/:id',
        EventsController.event);
    app.post('/event',
        EventsController.new_event);
    app.put('/event/:id',
        EventsController.update_event);
    app.delete('/event/:id',
        EventsController.delete_event);

    // Contents Modules
    app.get('/contents',
        ContentsController.contents);
    app.get('/content/:id',
        ContentsController.content);
    app.post('/content',
        ContentsController.new_content);
    app.put('/content/:id',
        ContentsController.update_content);
    app.delete('/content/:id',
        ContentsController.delete_content);

    app.get('/content_details/:content_id',
        ContentsController.contents_details);
    app.get('/content_detail/:id',
        ContentsController.content_detail);
    app.post('/content_detail',
        ContentsController.new_content_detail);
    app.put('/content_detail/:id',
        ContentsController.update_content_detail);
    app.delete('/content_detail/:id',
        ContentsController.delete_content_detail);
}