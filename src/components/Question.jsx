export default function Question({ question, selected, choose }) {
    return (
        <div className="text-inherit">
            <h2 className="text-lg font-semibold mb-4">{question.q}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-inherit">
                {question.options.map((op, i) => (
                    <button
                        key={i}
                        onClick={() => choose(i)}
                        className={`border rounded-xl p-3 text-left transition 
          ${selected === i ? "bg-slate-400 text-white" : "hover:bg-slate-500 hover:text-white "}`}
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}
