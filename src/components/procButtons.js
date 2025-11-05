import { Proc } from "../App";

function ProcButtons() {
    return (
        <>
        <div className="container text-center ">
            <div className="row gx-1">
                    <div className="col-6">
                    <button id="process" className="btn btn-outline-primary w-100 btn-equal btn-lg">Preprocess</button>
                </div>
                <div className="col-6">
                    <button id="process_play" className="btn btn-outline-primary w-100 btn-equal btn-lg">Proc &amp; Play</button>
                </div>
            {/* <button id="process" className="btn btn-outline-primary">Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary">Proc & Play</button> */}
            </div>
            </div>
        </>
    );
}
export default ProcButtons;