export default function GPAChartPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        School GPA Conversion Chart
      </h1>

      <p className="text-center text-gray-600 mb-4">
        This is the official GPA mapping chart from the student handbook.
      </p>

      <div className="rounded-xl overflow-hidden shadow-lg border border-purple-200">
        <img
          src="/gpa-chart.jpg"
          alt="School GPA conversion table"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
