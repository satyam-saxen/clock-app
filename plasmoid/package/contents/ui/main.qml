import QtQuick
import QtQuick.Layouts
import QtWebEngine
import org.kde.plasma.plasmoid

PlasmoidItem {
    id: root

    // Set a reasonable default size
    width: 600
    height: 300
    
    // Tooltip and Title
    Plasmoid.title: "React Clock"
    Plasmoid.icon: "chronometer"

    fullRepresentation: Item {
        Layout.preferredWidth: root.width
        Layout.preferredHeight: root.height

        WebEngineView {
            id: webView
            anchors.fill: parent
            
            // Load the bundled React app
            url: Qt.resolvedUrl("../html/index.html")
            
            // Transparency support
            backgroundColor: "transparent"
            
            // Interaction settings
            settings.javascriptCanOpenWindows: false
            settings.autoLoadImages: true
        }
    }
}
