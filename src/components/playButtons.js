
function PlayButtons({onPlay, onStop}) {
    return (
        <>
        <div class="container text-center">
            <div className="row gx-1">
                    <div className="col-6">
                    <button id="play" className="btn btn-success w-100 btn-equal btn-lg" onClick={onPlay}>Play</button>
                </div>
                <div className="col-6">
                    <button id="stop" className="btn btn-danger w-100 btn-equal btn-lg" onClick={onStop}>Stop</button>
                </div>
            </div>
        {/* <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
        <button id="stop" className="btn btn-outline-primary" onClick={onStop}>Stop</button> */}
        </div>
        </>
    );
}

export default PlayButtons;