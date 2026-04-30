import { generateResumePDF } from '/dev-server/src/lib/generateResume.ts';
import { jsPDF } from 'jspdf';
import fs from 'fs';
jsPDF.prototype.save = function(){
  fs.writeFileSync('/tmp/resume.pdf', Buffer.from(this.output('arraybuffer')));
};
generateResumePDF();
console.log('ok');
