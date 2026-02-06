export default function NegativeMarkingTable() {
  return (
    <div className="w-full mt-12">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3 text-white">OBJECTIVE TYPE QUESTIONS : – Normally has 4 Answers to select from</h3>
        <h4 className="text-xl font-bold mb-3 text-white">TYPES OF NEGATIVE MARKING</h4>
        <div className="space-y-2 mb-4 text-white">
          <p>Correct Answer +1, Wrong Answer – 1 – ANSWER ONLY IF YOU ARE SURE</p>
          <p>Correct Answer +1, Wrong Answer – 0.5 – ANSWER ONLY IF YOU CAN ELIMINATE 2</p>
          <p>Correct Answer +1, Wrong Answer -0.25 – ANSWER EVEN IF YOU CAN ELIMINATE 1</p>
          <p>NO Negative Marking – MUST ANSWER ALL QUESTIONS</p>
        </div>
        
        <h4 className="text-xl font-bold mb-2 text-white">ASSUMPTION –</h4>
        <div className="space-y-1 mb-6 text-white">
          <p>You are sure about (50 out of 100 Questions)</p>
          <p>You can identify 1 wrong answer (34 out of 100)</p>
          <p>You can identify 2 wrong answers (16 out of 100)</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm text-black bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 font-semibold text-left">Negative Marking</th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-center">+1 & -1</th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-center">+1 & -0.5</th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-center">+1 & -0.25</th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-center">No Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-3 font-medium">Strategy – Answer if</td>
              <td className="border border-gray-300 px-4 py-3 text-center">(Only sure)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">(Only if 2 eliminated)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">(if even 1 eliminated)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">Ans ALL</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-medium">Correct Known (50)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+50</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+50</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+50</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+50</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-3 font-medium">Eliminate 2 answer (16)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">0</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+ (8*1)–(8*0.5) = 4</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+ (8*1)–(8*0.25) = 6</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+8</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-medium">Eliminate 1 answer (34)</td>
              <td className="border border-gray-300 px-4 py-3 text-center">0</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+(11.33*1)-(22.66*0.5) = 0</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+(11.33*1)-(22.66*0.25) = 5.67</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+17</td>
            </tr>
            <tr className="bg-white font-bold">
              <td className="border border-gray-300 px-4 py-3">Total Marks</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+50</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+54</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+73</td>
              <td className="border border-gray-300 px-4 py-3 text-center">+75</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
