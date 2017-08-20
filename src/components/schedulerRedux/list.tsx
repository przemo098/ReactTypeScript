import * as React from 'react';


class Item {
    label: string;
    value: any;
}

interface Ilist {
    items: Array<Item>
}

class List extends React.Component<Ilist, any>{

    render() {
        console.log(this.props.items)
        return (
            <div>
                trololo
            </div>
        )
    }
}


import AppState from '../../state';
import { connect } from 'react-redux';
import { Schedule } from '../../model/schedule';


const mapStateToProps = (state: AppState) => state;
const mapDispatchToProps = (dispatch) => ({
    changeSelected: (newValue: Schedule) => {
        dispatch({ type: 'CHANGE_SELECTED', value: newValue });
    }
});

const item = connect(mapStateToProps, mapDispatchToProps)(List as any)
export default item;
