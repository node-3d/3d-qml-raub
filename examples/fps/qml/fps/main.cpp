#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char *argv[])
{
//    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
//    QObject::connect(
//        &engine,
//        &QQmlApplicationEngine::objectCreated,
//        &app,
//        [url](QObject *obj, const QUrl &objUrl) {
//            if (!obj && url == objUrl)
//                    QCoreApplication::exit(-1);
//        },
//        Qt::QueuedConnection
//    );
//    engine.addImportPath(QUrl::fromLocalFile("..").toString());
    engine.load(QUrl::fromLocalFile("../fps/main.qml"));

//    QQuickView view;
//    view.setSource(QUrl::fromLocalFile("main.qml"));
//    view.show();

    return app.exec();
}
