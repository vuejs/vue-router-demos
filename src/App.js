import Browser from './Browser'

export default {
  name: 'App',

  render () {
    return (<Browser bundle={() => import('../examples/simple')}/>)
  }
}
