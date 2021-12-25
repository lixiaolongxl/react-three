import state from '../state';
const Buttons = ({})=>{
    const style={
        position: 'absolute',
        top:'50px',
        fontSize:16,
        cursor: 'pointer',
        zIndex: 1,
        borderRadius:'50%',
    }
    const sets = {
        1:{
            cameraPos:[9,2,4],
            target:[4,0,0],
            name:'Capot001_CAR_PAINT_0'
        },
        2:{
            cameraPos:[1,2,5],
            target:[-4,0,0],
            name:'object005_bod_0'
        }
    }
    const handleClick=(num)=>{
        // console.log(num);
        state.cameraPos.set(...sets[num].cameraPos);
        state.target.set(...sets[num].target);
        state.activeMeshName = sets[num].name;
        state.shouldUpdate = true;
    }
    return (
        <div style={{position: 'relative'}}>
            <button onClick={()=>handleClick(2)} style={{...style,left:'30%'}}>{'<'}</button>
            <button onClick={()=>handleClick(1)} style={{...style,right:'30%'}}>{'>'}</button>
        </div>
    )
}
export default Buttons;