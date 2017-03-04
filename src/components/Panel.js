import React, { Component } from 'react';
import { XP_TO_NEXT_LEVEL } from '../utils/params';

class Panel extends Component {
    handleChange(e) {
        this.props.setShadowVisibility(e.target.checked);
    }
    render() {
        let panel;
        if (this.props.player) {
            panel =
                <div className="panel">
                    <div className="params">
                        <span>Level: {this.props.player.level}</span>
                        <span>Next level: {XP_TO_NEXT_LEVEL * this.props.player.level - this.props.player.xp} XP</span>
                        <span>Health: {this.props.player.health}</span>
                        <span>Weapon: {this.props.player.weapon.name}</span>
                        <span>Attack: {this.props.player.weapon.damage * this.props.player.level}</span>
                        <span>
                            <label>
                                <input type="checkbox" checked={this.props.showShadow} onChange={this.handleChange.bind(this)}/>
                                Toggle darkness
                            </label>
                        </span>
                    </div>
                    <div className="info">
                        <span>
                            <div className="tile player"></div> - you
                        </span>
                        <span>
                            <div className="tile health"></div> - health
                        </span>
                        <span>
                            <div className="tile weapon"></div> - weapon
                        </span>
                        <span>
                            <div className="tile exit"></div> - exit
                        </span>
                        <span>
                            <div className="tile enemy"></div> - enemy
                        </span>
                        <span>
                            <div className="tile enemy boss"></div> - BOSS
                        </span>
                    </div>

                </div>

        }
        return <div>{panel}</div>;
    }
}

export default Panel;
