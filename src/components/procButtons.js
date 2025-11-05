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
            </div>
            </div>
        </>
    );
}
export default ProcButtons;