export default {

  sources: [{
    id: 'spark',
    driver: '',
    url: '',
    user: 'hive',
    password: ''
  }],

  get () {
    return this.sources
  }
}