module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {
      pathname: 'index',
    });
  });
  app.get('/about-us', (req, res) => {
    res.render('about-us', {
      pathname: 'about',
    });
  });
  app.get('/units', (req, res) => {
    res.render('units', {
      pathname: 'units',
    });
  });
  app.get('/unit/:unit', (req, res) => {
    res.render('unit', {
      pathname: 'units',
      unit: req.params.unit,
      drama_coord: 'BABA ERE.jpg',
      choir_coord: 'CM.jpg',
      prayer_coord: 'BABA ADURA.jpg',
      org_male: 'DADDY ORG.jpg',
      org_female: 'MUM ORG.jpg',
      welfare_coord: 'welfare.jpeg',
      pro1: 'PRO 1.jpg',
      pro2: 'pro2.jpeg',
      evang_coord: 'EVANGELIST.jpg',
      bible_study_coord: 'BABA ORO.jpg',
      sunday_study_coord: 'IYA ORO.jpg',
    });
  });
  app.get('/programmes', (req, res) => {
    res.render('programmes', {
      pathname: 'programmes',
    });
  });
  app.get('/contact', (req, res) => {
    res.render('contact', {
      pathname: 'contact',
    });
  });
};
