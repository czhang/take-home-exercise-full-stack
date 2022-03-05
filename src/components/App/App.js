import React from 'react';
import axios from 'axios';
import TeamMember from '../TeamMember';
import './App.css';
import NewMemberForm from '../TeamMember/NewMemberForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
      loading: true,
      open: false,
    };
    this.setState = this.setState.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.addMember = this.addMember.bind(this);
  }

  async componentDidMount() {
    try {
      await this.fetchInitialData();
    } catch (error) {
      // try again after half a second if fails due to race condition
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.fetchInitialData();
      }, 500);
    }
  }

  async fetchInitialData() {
    const response = await axios.get('/team');
    this.setState({
      team: response.data,
      loading: false
    });
  }

  setOpen(condition) {
    this.setState({
      ...this.state,
      open: condition,
    })
  }

  addMember(member) {
    this.setState({
      ...this.state,
      team: [...this.state.team, member]
    })
  }

  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
      <div className="app">
        <div className="team-grid" />
        {this.state.team.map(member => (
          <TeamMember
            key={member.id}
            name={`${member.firstName} ${member.lastName}`}
            title={member.title}
            photoUrl={member.photoUrl}
            story={member.story}
            favoriteColor={member.favoriteColor}
          />
        ))}
        {/* Make this new team member link to your form! */}
        <TeamMember id="new" name="Join us!" title="New Teammate" setOpen={this.setOpen}/>
      </div>
        <NewMemberForm open={this.state.open} setOpen={this.setOpen} addMember={this.addMember}/>
      </>
    );
  }
}

export default App;
