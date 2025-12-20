export default function Question({ question, selected, choose }) {
    return (
        <div className="text-inherit w-full">
            {/* Savol matni */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
                {question.q}
            </h2>

            {/* Javoblar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {question.options.map((op, i) => (
                    <button
                        key={i}
                        onClick={() => choose(i)}
                        className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border text-left transition
              ${selected === i ? "bg-slate-600 text-white text-lg sm:text-xl md:text-2xl"
                                : "hover:bg-slate-500 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl"}`}
                    >
                        {op}
                    </button>
                ))}
            </div>
        </div>
    );
}
