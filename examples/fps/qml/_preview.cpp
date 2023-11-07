#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char *argv[])
{
	QGuiApplication app(argc, argv);
	QQmlApplicationEngine engine;
	engine.load(QUrl::fromLocalFile("../qml/_preview.qml"));
	return app.exec();
}
