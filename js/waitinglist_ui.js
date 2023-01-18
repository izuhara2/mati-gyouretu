
let nl = new nylon();
document.querySelector('#start').addEventListener('click', () => {
    nl.emit('start',null);
});
document.querySelector('#pause').addEventListener('click', () => {
    nl.emit('pause',null);
});
document.querySelector('#slider1').addEventListener('change', (ev) => {
   nl.emit('slider1', {val: ev.target.value});
});
document.querySelector('#slider2').addEventListener('change', (ev) => {
    nl.emit('slider2', {val: ev.target.value});
 });
 document.querySelector('#slider3').addEventListener('change', (ev) => {
    nl.emit('slider3', {val: ev.target.value});
 });
 document.querySelector('#slider4').addEventListener('change', (ev) => {
    nl.emit('slider4', {val: ev.target.value});
 });

let waitinglist = new Shop( 1, 1, 0.1, 0.1 );
let timer = new vbTimer();
timer.interval = 10;
timer.timer = () => {
    waitinglist.process(0.01);
}
let nl2 = new nylon();

nl2.on('start', () => {
    timer.enable();
})
nl2.on('pause', () => {
    console.log('とめてー');
    timer.disable();
});
nl2.on('slider1', (key, value) => {
    document.querySelector('#processing_time').innerText = String(value.val);
});
nl2.on('slider2', (key, value) => {
    document.querySelector('#deviation').innerText = String(value.val);
});
nl2.on('slider3', (key, value) => {
    document.querySelector('#flow').innerText = String(value.val);
});
nl2.on('slider4', (key, value) => {
    document.querySelector('#madoguti').innerText = String(value.val);
});