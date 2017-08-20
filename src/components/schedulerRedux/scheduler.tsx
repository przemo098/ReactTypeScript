import * as React from 'react';

import { connect } from 'react-redux';
import * as Select from 'react-select';
import AppState from '../../state';
import { Schedule } from '../../model/schedule';
import list from './list';

interface Isample extends React.Props<any> {
    lol: number;
}

class Scheduler extends React.Component<AppState, any> {

    options = this.props.scheduler.schedules.map((x) => { return { value: x as any, label: x.name } });
    render() {
        return (
            <div>
                <div className="dropdown">
                    <button className="dropbtn">Dropdown</button>
                    {new list(mapDispatchToProps)}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => state;

const mapDispatchToProps = (dispatch) => ({
    changeSelected: (newValue: Schedule) => {
        dispatch({ type: 'CHANGE_SELECTED', value: newValue });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler as any);