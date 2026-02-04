import type { Language } from '@/lib/translations';

const ProblemSolutionImpact = ({
  language,
  problem,
  solution,
  impact
}: {
  language: Language;
  problem: string;
  solution: string;
  impact: string;
}) => (
  <div className="mb-5 space-y-2 sm:space-y-3">
    <div className="border-l-4 border-rose-800 pl-3 sm:pl-4 bg-rose-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-rose-900 mb-1">{language === 'en' ? 'Problem' : 'Problem'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{problem}</p>
    </div>
    <div className="border-l-4 border-teal-700 pl-3 sm:pl-4 bg-teal-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-teal-900 mb-1">{language === 'en' ? 'Solution' : 'Loesung'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{solution}</p>
    </div>
    <div className="border-l-4 border-blue-800 pl-3 sm:pl-4 bg-blue-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-blue-900 mb-1">{language === 'en' ? 'Impact' : 'Wirkung'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{impact}</p>
    </div>
  </div>
);

export default ProblemSolutionImpact;
