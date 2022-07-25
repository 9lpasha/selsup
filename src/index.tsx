import React, {FormEvent, useState} from 'react';
import ReactDOM from 'react-dom/client';

interface Param {
    id: number
    name: string
}

interface ParamValue {
    paramId: number
    value: string
}

interface Model {
    paramValues: Array<ParamValue>
}

interface Props {
    params: Array<Param>
    model: Model
    setValues: (model: Model) => void
}

interface RowProps {
    span: string
    input: string
    id: number
    model: Model
    setValues: (model: Model) => void
}

const Row = ({span, input, id, setValues, model}: RowProps) => {

    const changeValue = (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        setValues({
            paramValues: [...model.paramValues.filter((el) => el.paramId != id), {
                paramId: id,
                value: target.value
            }]
    })
        console.log(model)
    }

    return(
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', width: '400px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px'}}>{span}</span>
            <input style={{fontSize: '20px'}} type="text" value={input} onInput={changeValue}/>
        </div>
    )
}

const ParamEditor = ({params, model, setValues}: Props) => {
    return(
        <div style={{padding: '200px'}}>
            {
                params.map((el) => (
                    <div>
                        <Row model={model} setValues={setValues} id={el.id} span={el.name}
                             input={model.paramValues.filter((el2) => el2.paramId == el.id)[0].value}/>
                    </div>
                ))
            }
        </div>
    )
}

const App = () => {

    const [model, setModel]: [Model, (model: Model) => void] = useState(
        {
            paramValues: [
                {
                    "paramId": 1,
                    "value": "Повседневное"
                },
                {
                    "paramId": 2,
                    "value": "Макси"
                }
            ]
        }
    );
    const [params, setParams]: [Array<Param>, (model: Array<Param>) => void] = useState(
        [
            {
                'id': 1,
                'name': 'Назначение'
            },
            {
                'id': 2,
                'name': 'Длина'
            }
        ]
    );

    const getModel =  () => {
        return model
    }

    return (
        <ParamEditor model={model} params={params} setValues={setModel}></ParamEditor>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <App/>
);