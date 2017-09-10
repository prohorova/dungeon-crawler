import React from 'react';
import { XP_TO_NEXT_LEVEL } from '../utils/params';

const Panel = ({player, showShadow, setShadowVisibility}) => {
    let panel;
    if (player) {
        panel =
            <div className="panel">
                <div className="params">
                    <span>Level: {player.level}</span>
                    <span>Next level: {XP_TO_NEXT_LEVEL * player.level - player.xp} XP</span>
                    <span>Health: {player.health}</span>
                    <span>Weapon: {player.weapon.name}</span>
                    <span>Attack: {player.weapon.damage * player.level}</span>
                    <span>
                            <label>
                                <input type="checkbox" checked={showShadow}
                                       onChange={e => setShadowVisibility(e.target.checked)}/>
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
};

export default Panel;
