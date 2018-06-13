import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppComponent from './components';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading
});

const mapDispatchToProps = dispatch => ({
  sayHelloWorld : ()=> dispatch({ type: 'HELLO_WORLD'})
})

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
export default App;
