export default function GPAChartPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        About
      </h1>
      <p className="text-xl text-center text-gray-600 mb-4">
        The idea for this website is that it's really hard to manually calculate our GPA at Central
        with this chart because most people don't even know about it.
        Hopefully this website should make it easier to have an idea of what your GPA is without having to wait for report cards. 
      </p>
      <br></br><br></br>
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        School GPA Conversion Chart
      </h1>

      <div className="text-center text-gray-600 mb-4">
        <p>
          This is the official GPA mapping chart from the student handbook.
        </p>
        <p>
          This chart takes in your grade out of 100 and converts it into a GPA value that gets added to an average to calculate your GPA.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border border-purple-200">
        <img
          src="/gpa-chart.jpg"
          alt="School GPA conversion table"
          className="w-full h-auto"
        />
      </div>
      <br></br><br></br>
       <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        About Standardized GPA
      </h1>
      <p className="text-xl text-center text-gray-600 mb-4">
        I created the Standard GPA so that you could compare your grades to how a GPA is regularly calculated. 
        An A (91-100) counts as a 4.0, B (81-90) is counted as a 3.0, etc. 
        Standard Weighted is calculated just like above but 1.0 points is added if the class is Honors or AP. 
      </p>
    </div>
  );
}
